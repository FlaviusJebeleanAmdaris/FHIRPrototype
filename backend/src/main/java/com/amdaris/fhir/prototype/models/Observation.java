package com.amdaris.fhir.prototype.models;

import java.util.Date;

public class Observation extends FHIRResource {

    public Observation(String id, int txid, Date timestamp, String resourceType, String resource) {
        super(id, txid, timestamp, resourceType, resource);
    }

    @Override
    public String toString() {
        return "Observation{" +
                "id='" + this.getId() + '\'' +
                ", txid=" + this.getTxid() +
                ", timestamp=" + this.getTimestamp() +
                ", resourceType='" + this.getResourceType() + '\'' +
                ", resource='" + this.getResource() + '\'' +
                '}';
    }
}
