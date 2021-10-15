package com.amdaris.fhir.prototype.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;

import java.util.Date;

public abstract class FhirResource {
    @Id
    private String id;

    private int txid;

    @Column("ts")
    private Date timestamp;

    @Column("resource_type")
    private String resourceType;

    private String resource;

    public FhirResource(String id, int txid, Date timestamp, String resourceType, String resource) {
        this.id = id;
        this.txid = txid;
        this.timestamp = timestamp;
        this.resourceType = resourceType;
        this.resource = resource;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getTxid() {
        return txid;
    }

    public void setTxid(int txid) {
        this.txid = txid;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public String getResourceType() {
        return resourceType;
    }

    public void setResourceType(String resourceType) {
        this.resourceType = resourceType;
    }

    public String getResource() {
        return resource;
    }

    public void setResource(String resource) {
        this.resource = resource;
    }
}
